class ArtworksController < ApplicationController
  def show
    artwork = Artwork.find(params[:id])
    @artwork_logs = artwork.artwork_logs.order('created_at ASC')

    @artwork = Artwork.find(params[:id]).as_json(index: true)
    @artist = @artwork[:artist]
  end
end
