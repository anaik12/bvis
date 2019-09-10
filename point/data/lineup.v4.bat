@ECHO On
IF "%1"=="" (GOTO Continue)

if "%~x2" == ".csv" (set  d="-F,") 


IF "%1"== "0" (.\gawk NR==1 %2 | .\gawk %d% "{print NF}" > tempFile.txt
set /p  last=<tempFile.txt)  ELSE ( set /a last="%1" )



type NUL>tempFile.txt


for /l %%i in (1,1,%last%) do .\gawk %d% "{print $%%i}" %2 >>  tempFile.txt

.\gawk NF tempFile.txt > %~n2_converted.txt

del tempFile.txt

exit
:Continue

ECHO ERROR: need Input file
