class AddVerifiedToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :verified, :boolean, default: false
    remove_column :artworks, :overview, :string
  end
end
