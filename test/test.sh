touch test/index.txt
# reason about `echo -n` doesn't work with child_process on OSX
# http://stackoverflow.com/questions/26898490/echo-ignores-flag-in-child-process-exec
echo hello > test/index.txt
# comments will be ignored
cat test/index.txt
