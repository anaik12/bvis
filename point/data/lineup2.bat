@ECHO OFF
IF "%1"=="" GOTO Continue
del tempFile.txt
for /l %%i in (1,1,2) do .\gawk "{print $%%i}" %1 >>  tempFile.txt
.\gawk NF tempFile.txt > %~n1_converted.txt
exit
:Continue

ECHO ERROR: need Input file
exit