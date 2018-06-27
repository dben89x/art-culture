namespace :components do
  # Call with 'rake components:add[Foobar]'
  desc "TODO"
  task :add, [:component_name] => [:environment] do |t, args|
    require 'fileutils'

    # mutate application.js
    tempfile=File.open("file.tmp", 'w')
    f = File.new(Rails.root.join("app/javascript/packs/application.js"))
    f.each do |line|
      tempfile << line
      if line=~/import ReactOnRails from 'react-on-rails';/
        tempfile << "import #{args[:component_name]} from '../components/#{args[:component_name]}';\n"
      end
      if line=~/^ReactOnRails.register\({/
        tempfile << "  #{args[:component_name]},\n"
      end
    end
    f.close
    tempfile.close
    FileUtils.mv("file.tmp", Rails.root.join("app/javascript/packs/application.js"))

    # add new file
    # FileUtils.cp(Rails.root.join("app/javascript/components/Template.jsx"), Rails.root.join("app/javascript/components/#{args[:component_name]}.jsx"))
    new_component_file = File.read(Rails.root.join("app/javascript/components/Template.jsx")).gsub('Template', args[:component_name])
    File.open(Rails.root.join("app/javascript/components/#{args[:component_name]}.jsx"), "w") {|file| file.puts new_component_file}

  end
end
