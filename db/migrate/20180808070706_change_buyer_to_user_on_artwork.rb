class ChangeBuyerToUserOnArtwork < ActiveRecord::Migration[5.1]
  def change
    remove_column :artworks, :buyer_id, :bigint
    add_reference :artworks, :user, index: true
  end
end
