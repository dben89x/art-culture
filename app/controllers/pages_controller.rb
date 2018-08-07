class PagesController < ApplicationController
  def home
    @artworks = Artwork.all.as_json(index: true)
    @artists = Artist.select {|a| a.artworks.any?}.as_json(index: true)
    @recent_listings = Artwork.last(6).as_json(index: true)
    @user_artwork_favorites = current_user.try(:user_artwork_favorites) || []
    @user_artwork_favorite_ids = @user_artwork_favorites.any? ? @user_artwork_favorites.pluck(:artwork_id) : []
  end

  def blog
    @blog_posts = BlogPost.all.as_json(index: true)
    @recent_posts = BlogPost.all.order('created_at DESC').last(4).as_json(index: true)
    @categories = BlogCategory.all.order('title ASC')
  end

  def contact

  end
end
