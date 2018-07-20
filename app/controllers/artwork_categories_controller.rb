class ArtworkCategoriesController < ApplicationController
  def index
    @categories = ArtworkCategory.all
  end
end
