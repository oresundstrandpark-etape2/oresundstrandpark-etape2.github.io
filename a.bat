@echo off
ECHO Uploader ændringer tilbage til GitHub...
git add --all
git commit -m "%1"
git push -u origin master
