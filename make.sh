rm -rf dist*
yarn build 
tar zcvf dist.tgz dist
open .
