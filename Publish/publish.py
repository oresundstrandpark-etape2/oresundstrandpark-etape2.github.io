#!/usr/bin/python
# -*- coding: utf-8 -*-
# Requirements: pandoc, python, git

# Imports
import sys
import os
import shutil
import datetime

# Check arguments
argnum = len(sys.argv)
if argnum < 3:
    print "Koer programmet som: python publish.py document YYYYMMDD"
    print "Eksempelvis: python publish.py EF-2-moede-07012019 20190107"
    sys.exit(0)

# Pre-check files
file = sys.argv[1] + ".docx"
if not os.path.exists(file):
    print "Fil " + file + " blev ikke fundet"
    sys.exit(0)
file = sys.argv[1] + ".pdf"
if not os.path.exists(file):
    print "Fil " + file + " blev ikke fundet"
    sys.exit(0)

# Convert Word to HTML
print "Konverting af word til html"
cmd = "pandoc " + sys.argv[1] + ".docx -o out.html"
os.system(cmd)

# Rename PDF
origpdf = sys.argv[1] + ".pdf"
newpdf = "referat_" + sys.argv[2] + ".pdf"
if os.name == "nt":
    os.system("copy " + origpdf + " " + newpdf)
else:
    os.system("cp " + origpdf + " " + newpdf)

# Read referat
with open("out.html", "r") as myfile:
    out = myfile.read()
os.remove("out.html")

# Read template
with open("template.html", "r") as myfile:
    tmpl = myfile.read()

# Merge
tmpl = tmpl.replace("<!-- Indsaet referat her -->", out)
tmpl = tmpl.replace('<embed src="media/image1.emf" style="width:2.78125in;height:0.85417in" />', "")
tmpl = tmpl.replace("YYYYMMDD", sys.argv[2])
newhtml = "referat_" + sys.argv[2] + ".html"
with open(newhtml, "w") as myfile:
    myfile.write(tmpl)

# Copy files to dokumenter
shutil.copyfile(newhtml, "../dokumenter/" + newhtml)
shutil.copyfile(newpdf, "../dokumenter/" + newpdf)

date = datetime.datetime.strptime(sys.argv[2], "%Y%m%d")
longdate = datetime.date.strftime(date, "%d. %b %Y")

# Update index
indextmpl = "index-template.html"
with open(indextmpl, "r") as myfile:
    indextmpl = myfile.read()
indexfile = "../index.html"
with open(indexfile, "r") as myfile:
    index = myfile.read()
indextmpl = indextmpl.replace("DATE", longdate)
indextmpl = indextmpl.replace("FILE", "dokumenter/" + newhtml)
if index.find(indextmpl) == -1:
    find = "<!-- Tilfoej en linje her for nyt indlaeg -->"
    index = index.replace(find, find + "\r\n\t\t\t" + indextmpl)
    with open(indexfile, "w") as myfile:
        myfile.write(index)
    print "Opdateret: index.html"
else:
    print "Allerede opdateret: index.html"  


# Update referat
referatfile = "../referater.html"
with open(referatfile, "r") as myfile:
    referat = myfile.read()
txt = '<p><a href="dokumenter/' + newhtml + '">Møde d. ' + longdate + '"</a></p>'
if referat.find(txt) == -1:
    find = "<!-- Tilfoej en linje her for nyt indlaeg -->"
    referat = referat.replace(find, find + "\r\n\t\t\t" + txt)
    with open(referatfile, "w") as myfile:
        myfile.write(referat)
    print "Opdateret: referater.html"
else:
    print "Allerede opdateret: referater.html"
