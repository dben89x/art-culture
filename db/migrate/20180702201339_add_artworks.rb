class AddArtworks < ActiveRecord::Migration[5.1]
  def change
    create_table :artwork_categories do |t|
      t.string :title
    end

    create_table :artworks do |t|
      t.belongs_to :artist
      t.belongs_to :artwork_category
      t.belongs_to :buyer
      t.string :title
      t.boolean :published
      t.string :description
      t.string :overview
      t.text :bio
      t.timestamps
    end

    create_table :artwork_logs do |t|
      t.string :type
      t.belongs_to :artist
      t.belongs_to :artwork
      t.belongs_to :buyer
      t.belongs_to :bid
      t.integer :price
      t.text :notes
      t.text :description
      t.timestamps
    end

    create_table :bids do |t|
      t.belongs_to :artwork
      t.belongs_to :buyer
      t.timestamps
    end

  end
end
