class BlogPostsController < ApplicationController
  inherit_resources
  
  def show
    @blog_post = BlogPost.find(params[:id]).as_json(index: true)
    @related_articles = BlogPost.last(3)
    @page_title = "News | #{@blog_post[:title]}"
    @page_description = @blog_post[:overview]
  end
end
