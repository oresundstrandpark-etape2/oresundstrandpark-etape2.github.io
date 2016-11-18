@echo off
ECHO Uploader aendringer tilbage til GitHub...
git pull
git add --all
git commit -m "%1"
git push -u origin master
