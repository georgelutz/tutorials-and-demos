TCL Connected Fleet
===========

### Getting started
If you have not already configured an SSH key for use with Git and GitHub, please follow [the instructions here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/).

Perform the following from Git Bash. If you have already installed gulp globally, then you can skip the first line.

```
npm install --global gulp
git clone git@github.com:TrimbleTCL/tcl-cf.git <folder-name>
cd <folder-name>
npm i
gulp
```

When this is done your website will be served locally on port 9000 (http://localhost:9000/)

If you want to manually push your code to S3 you can do so by configuring the AWS command line interface (CLI) and running the following command:

```
gulp build
aws s3 sync dist/ s3://tcl-cf-dev --delete
```

### Before you submit a PR
Prior to submitting a PR there are a few things you'll need to do. Make sure you pass static code analysis by running...

```
gulp lint
```

Make sure you have written unit tests for your code and that they pass by running...

```
gulp mocha
```

after they've passed, please confirm that you have sufficient code coverage by reviewing 'index.html' in the 'coverage' folder.

Make sure you are passing all integration tests. You will need to install/run the selenium standalone server. 
You may be able to follow the [instructions here] (http://www.protractortest.org/#/), though I had some difficulty with that and I 
ended up installing the [selenium standalone server](http://www.seleniumhq.org/download/) and 
[Chrome WebDriver](https://sites.google.com/a/chromium.org/chromedriver/downloads) manually. If you install it manually, remember to add the location of the Chrome 
WebDriver to your PATH environment variable. Also, to manually run the selenium server run the following.

```
java -jar ./selenium-jar-filename.jar -port 4443
```

I had to use a non-default port because 4444 is apparently in use on my system. So it's a little selfish of me.

To run the tests run the following from the root folder...

```
npm run ui-test
```