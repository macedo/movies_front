require "yaml"
require "mustache"

namespace :build do
  task :stylesheets do
   system "cat assets/css/*.css > _site/assets/bundle-#{digest}.css"
  end

  task :scripts do
    system "babel --presets react,es2015 assets/js/source -d assets/js/build"
    system "browserify assets/js/build/app.js -o _site/assets/bundle-#{digest}.js"
    #system "NODE_ENV=production browserify -t [ babelify --presets [ es2015 react ] ] -g uglifyify assets/js/source/app.js > _site/assets/bundle-#{digest}.js"
  end

  task :html do
    Dir["*.html"].each do |file|
      meta, content = File.read(file).split("\n\n")

      meta = OpenStruct.new(YAML.load(meta))
      layout = File.read("_layouts/#{meta.layout}.html.mustache")

      File.open("_site/#{file}", "w") do |f|
        f.write Mustache.render(layout, content: content, digest: digest)
      end
    end
  end
end

task :build => ["build:html", "build:stylesheets", "build:scripts"]

task :server => [:build] do
  system "rackup"
end

task :watch do
  system "watch 'rake build' js/source css"
end

def digest
  @digest ||= SecureRandom.hex
end
