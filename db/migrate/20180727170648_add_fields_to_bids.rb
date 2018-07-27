class AddFieldsToBids < ActiveRecord::Migration[5.1]
  def change
    add_column :bids, :open, :boolean
    add_column :bids, :accepted, :boolean
    add_column :bids, :price, :float
    add_column :bids, :notes, :text

    add_column :buyers, :first_name, :string
    add_column :buyers, :last_name, :string

    add_column :artworks, :price, :float

    remove_column :artwork_logs, :artist_id
  end
end
