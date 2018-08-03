class BlogCreation < ActiveRecord::Migration[5.1]
  create_table :blog_categories do |t|
    t.string :title
    t.timestamps
  end

  create_table :blog_posts do |t|
    t.belongs_to :blog_category
    t.string :image
    t.string :title
    t.string :description
    t.string :overview
    t.text :content
    t.string :slug
    t.boolean :published
    t.timestamps
  end

  create_table :blog_tags do |t|
    t.string :title
    t.timestamps
  end

  create_table :blog_post_tags do |t|
    t.belongs_to :blog_post
    t.belongs_to :blog_tag
    t.timestamps
  end

end
