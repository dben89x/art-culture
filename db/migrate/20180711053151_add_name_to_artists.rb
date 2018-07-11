class AddNameToArtists < ActiveRecord::Migration[5.1]
  def change
    add_column :artists, :first_name, :string
    add_column :artists, :last_name, :string
    add_column :artists, :slug, :string
    add_column :artworks, :slug, :string
  end
end
