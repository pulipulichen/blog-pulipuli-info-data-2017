# Input file format: https://github.com/pulipulichen/blog-pulipuli-info-data-2017/blob/master/05/lag-sequential-analysis/data-arulesSequences-sig-same.csv
#csv.path = choose.files(default = "input.csv", caption = "Please select an input CSV file")
#csv.path = "data-arulesSequences-sig-same.csv"
#csv.path = "序列分析資料 - 任務分開.csv"
csv.path = "序列分析資料 - 任務合併.csv"

#output.csv.path = choose.files(default = paste0("output-",format(Sys.time(), "%m%d-%H%M"),".csv"), caption = "Please specify the output CSV file path")
#output.csv.path = paste0("output-",format(Sys.time(), "%m%d-%H%M"), ".csv")
output.csv.path = paste0("output", ".csv")

# events minimus limit
events.size.min = 100

# The number of itemsets to return, an integer (default 100).
opus.k = 100

# ﬁlter itemsets that are not independently productive (default TRUE)
opus.filter_itemsets = TRUE

# make lift (rather than leverage) the measure of interest (default FALSE)
opus.search_by_lift = FALSE

# correct alpha for the size of the search space (default TRUE)
opus.correct_for_mult_compare <- FALSE

# exclude redundant itemsets (default TRUE)
opus.redundancy_tests <- TRUE

## ==================================================================

# 之後要改成更完整的更新
#lib.name <- "opusminer"
#if(require("opusminer")){
  #print(paste(lib.name, "is loaded correctly"))
#} else {
  #print(paste("trying to install", lib.name))
  #install.packages("opusminer")
  #if(require(lib.name)){
  #  print(paste(lib.name, "installed and loaded"))
  #} else {
  #  stop(lib.name("could not install", lib.name))
  #}
#}
library("opusminer")

## ==================================================================

df = read.csv(csv.path, fileEncoding = "UTF-8")

# 避免欄位變成charactor或factor，要轉換成string
df <- data.frame(lapply(df, as.character), stringsAsFactors=FALSE)

# 取得欄位名字
col.names <- colnames(df)

# 排序
df<-df[order(df[col.names[2]], decreasing = FALSE),]
df<-df[order(df[col.names[1]], decreasing = FALSE),]

## ===================================================================

# 事件的分隔符號
events.seg <- "&"

# 合併時間相同的欄位
df3 <- data.frame(col.names = c(0), seq_id=c(0), events=c(0), stringsAsFactors=FALSE)
colnames(df3) <- col.names

# 合併同樣時間的事件
lastUserId <- 0
lastSeqId <- 0
lastIndex <- 0
for(i in 1:nrow(df)) {
  userId <- df[i,col.names[1]]
  seqId <- df[i,col.names[2]]
  if (i == 1) {
    df3[nrow(df3),] <- df[i,]
    lastIndex <- i
    lastUserId <- userId
    lastSeqId <- seqId
  } else {
    if (lastUserId == userId && lastSeqId == seqId) {
      events.last <- df3[nrow(df3), col.names[3]]
      events2 <- df[i, col.names[3]]
      #cat(paste(events.last, events2))
      #cat(grep(events2, events.last))
      if (nchar(events.last) > 0 && length(grep(pattern = events2, events.last)) == 0) {
        df3[nrow(df3), col.names[3]] <- paste0(events.last, events.seg, events2) # 用分隔符號連結兩個事件
      }
    } else {
      df3 <- rbind(df3, df[i,])
    }
    lastIndex <- i
    lastUserId <- userId
    lastSeqId <- seqId
  }
}

df <- df3

# 將分號;取代為指定的連接符號
df[col.names[3]] <- sapply(df[col.names[3]], function(x) {
  gsub(";", events.seg, x)
})

## ==================================================================

# 再來是將檔案轉換成mushroom.dat的格式：每一行為一個人，用空格分隔每一個事件
df.trans <- data.frame(seq=c(), stringsAsFactors=FALSE)
lastUserId <- 0
for(i in 1:nrow(df)) {
  userId <- df[i,col.names[1]]
  events <- df[i,col.names[3]]
  if (i == 1) {
    df.trans <- data.frame(seq=c(events), stringsAsFactors=FALSE)
  }
  else {
    if (lastUserId != userId) {
      df.trans <- rbind(df.trans, data.frame(seq=c(events), stringsAsFactors=FALSE))
    }
    else {
      events.last <- df.trans[nrow(df.trans), "seq"]
      df.trans[nrow(df.trans), "seq"] <- paste0(events.last, " ", events)
    }
  }
  lastUserId <- userId
}
transactions.path <- "transactions.tmp.dat"
write.table(df.trans, file="transactions.tmp.dat", row.names=FALSE, col.names=FALSE, sep=",", quote=FALSE)

## ==================================================================
# 開始用OPUS Miner Algorithm發掘序略
# https://cran.r-project.org/web/packages/opusminer/index.html

if (nrow(df) > events.size.min) {
  trans <- read_transactions(transactions.path, format = "itemsets")
  result <- opus(trans, format = "data.frame"
                 , k = opus.k
                 , filter_itemsets = opus.filter_itemsets
                 , search_by_lift = opus.search_by_lift
                 , correct_for_mult_compare = opus.correct_for_mult_compare
                 , redundancy_tests = opus.redundancy_tests)
} else {
  paste("Events size too small. (", nrow(df) , "<", events.size.min , ")")
}

## =======================================

# 寫入結果
if (nrow(df) > events.size.min) {
  result.simple <- data.frame(itemset=c(), count=c(), value=c(), p=c(), self_sufficient=c(), stringsAsFactors=FALSE)
  for(i in 1:nrow(result)) {
    itemset <- result[i,"itemset"]
    if (itemset != "") {
      result.simple <- rbind(result.simple, result[i,])
    }
  }
  if (nrow(result) > 0) {
    result.simple["itemset"] <- sapply(result.simple["itemset"], function(x) {
      gsub(", ", " ", x)
    })
  }
  write.table(result.simple, file=output.csv.path, row.names=FALSE, sep=",")
  
}

## =======================================
# 移除多餘檔案與變數
#file.remove(transactions.path)
#rm(list = setdiff(ls(), lsf.str()))