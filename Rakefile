def commit
  puts "Commiting"
  system "git checkout source"
  system "git add -A"
  system "git commit -m 'deploy :#{Time.now.to_s}'"
  system "git push origin"
end

def deploy
  puts "Deploying"
  system "bundle exec middleman deploy"
end

task :deploy do
  commit
  deploy
end
