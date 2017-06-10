# Code Source: https://en.wikibooks.org/wiki/Data_Mining_Algorithms_In_R/Sequence_Mining/SPADE

# 最小支持度：篩選出至少40%的人共有的樣式
minSupport <- 0.4

# ------------------------
# 套件安裝

if(require("arules")){
  print("arules is loaded correctly")
} else {
  print("trying to install arules")
  install.packages("arules")
  if(require(arules)){
    print("arules installed and loaded")
  } else {
    stop("could not install arules")
  }
}

if(require("arulesSequences")){
  print("arulesSequences is loaded correctly")
} else {
  print("trying to install arulesSequences")
  install.packages("arulesSequences")
  if(require(arules)){
    print("arulesSequences installed and loaded")
  } else {
    stop("could not install arulesSequences")
  }
}

if(require("stringr")){
  print("stringr is loaded correctly")
} else {
  print("trying to install stringr")
  install.packages("stringr")
  if(require(stringr)){
    print("stringr installed and loaded")
  } else {
    stop("could not install stringr")
  }
}

if(require("V8")){
  print("V8 is loaded correctly")
} else {
  print("trying to install V8")
  install.packages("V8")
  if(require(V8)){
    print("V8 installed and loaded")
  } else {
    stop("could not install V8")
  }
}

# 套件載入
library(Matrix)
library(arules)
library(arulesSequences)
library(stringr)
library(V8)

# 定義函式trim()
trim <- function (x) gsub("^\\s+|\\s+$", "", x)

# --------------------------

#df = read.csv(choose.files(default = "input.csv", caption = "Please select an input CSV file"), fileEncoding = "UTF-8")
df = read.csv("data.csv", fileEncoding = "UTF-8") # 測試用


# 取得欄位名字
col.names <- colnames(df)

# --------------------------

df3 <- data.frame(user_id=c(), seq_id=c(),events=c())

insertRow <- function(existingDF, newrow, r) {
  existingDF[seq(r+1,nrow(existingDF)+1),] <- existingDF[seq(r,nrow(existingDF)),]
  existingDF[r,] <- newrow
  existingDF
}

df3 <- by(df, 1:nrow(df), function(row) {
  row
})

# --------------------------

# 將分號;取代為空格
df[col.names[3]] <- sapply(df[col.names[3]], function(x) {
  gsub(";", " ", x)
})

# 計算事件的數量
df$Event_count <- sapply(df[,col.names[3]], function(x) {
  length(unlist(strsplit(as.character(trim(x)), "\\W+")))
})

df2<-data.frame("score"=df[col.names[1]],"sequence_length"=df[col.names[2]],"support"=df["Event_count"],"sequence"=df[col.names[3]])

tmp.txt <- "tmp.txt"
write.table(df2, file=tmp.txt, row.names=FALSE, col.names=FALSE, sep=" ", quote=FALSE)

# --------------------------

x <- read_baskets(tmp.txt, info = c("sequenceID","eventID","SIZE"))
s1 <- cspade(x, parameter = list(support = minSupport), control = list(verbose = TRUE))

# -------------

s2<-as(s1, "data.frame")
s2["sequence_length"]<-c(str_count(array(unlist(s2["sequence"])), "\\},\\{")+1)
s2["score"]<-c(s2["sequence_length"]*s2["support"])
s2<-s2[order(s2["score"], decreasing = TRUE),]
s3<-data.frame("score"=s2["score"],"sequence_length"=s2["sequence_length"],"support"=s2["support"],"sequence"=s2["sequence"])
s3$score <- sapply(s3$score, function(x) {
  round(x, 3)
})
s3$support <- sapply(s3$support, function(x) {
  round(x, 3)
})
#write.table(s3, file=choose.files(default = paste0("output-",format(Sys.time(), "%m%d-%H%M"),".csv"), caption = "Please specify the output CSV file path"), row.names=FALSE, sep=",")

# -------------
file.remove(tmp.txt)