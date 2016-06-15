if [ -z "$ENV" ]; then
  ENV="development"
fi

#JS
babel --presets react,es2015 js/source -d js/build
browserify js/build/app.js -o public/js/bundle.js

#CSS
cat css/*/* css/*.css | sed 's/..\/..\/images/images/g' > public/css/bundle.css
date; echo;
