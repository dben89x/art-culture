class AddArtworkTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :title
    end
    create_table :artwork_tags do |t|
      t.belongs_to :artwork
      t.belongs_to :tag
    end
  end
end
