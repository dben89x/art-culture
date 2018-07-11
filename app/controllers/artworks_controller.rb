class ArtworksController < ApplicationController
  def show
    @artwork = Artwork.find(params[:id]).as_json(index: true)
    @artist = @artwork[:artist]
  end
end
