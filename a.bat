@echo off
ECHO Uploader �ndringer tilbage til GitHub...
git add --all
git commit -m "%1"
git push -u origin master
