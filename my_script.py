import sys
import nltk

code1 = sys.argv[1];
code2 = sys.argv[2];
# print(code1)
text1 = code1.split('\r')

# coding: utf-8

# Read document which in .txt format

file1=open("doc1.txt","r")
text1=file1.readlines()
text1


file2=open("doc2.txt","r")
text2=file2.readlines()
text2



# Convert list to string 

str1=''.join(text1)
str2=''.join(text2)



str1



str2


# Split the string

sent_text1=str1.split('.')
sent_text2=str2.split('.')



sent_text1


sent_text2


# Create a for loop that compares two lists

final_list=[]
for z in sent_text1:
    for y in sent_text2:
        if z == y:
            final_list.append(z)



final_list

print(85)