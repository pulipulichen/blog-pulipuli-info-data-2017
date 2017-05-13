# Code Source: https://en.wikibooks.org/wiki/Data_Mining_Algorithms_In_R/Sequence_Mining/SPADE

# 最小支持度：篩選出至少40%的人共有的樣式
minSupport <- 0.8

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

library(Matrix)
library(arules)
library(arulesSequences)
library(stringr)

# --------------------------

df = read.csv(choose.files(default = "input.csv", caption = "Please select an input CSV file"))
trim <- function (x) gsub("^\\s+|\\s+$", "", x)
col.names <- colnames(df)
df[col.names[3]] <- sapply(df[col.names[3]], function(x) {
  gsub(";", " ", x)
})
df$Event_count <- sapply(df[col.names[3]], function(x) {
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
write.table(s3, file=choose.files(default = "output.csv", caption = "Please specify the output CSV file path"), row.names=FALSE, sep=",")

# -------------
file.remove(tmp.txt)