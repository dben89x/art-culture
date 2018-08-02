# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180801180926) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "artwork_categories", force: :cascade do |t|
    t.string "title"
    t.string "image"
  end

  create_table "artwork_images", force: :cascade do |t|
    t.bigint "artwork_id"
    t.string "url"
    t.boolean "published"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_artwork_images_on_artwork_id"
  end

  create_table "artwork_logs", force: :cascade do |t|
    t.string "type"
    t.bigint "artwork_id"
    t.bigint "buyer_id"
    t.bigint "bid_id"
    t.integer "price"
    t.text "notes"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_artwork_logs_on_artwork_id"
    t.index ["bid_id"], name: "index_artwork_logs_on_bid_id"
    t.index ["buyer_id"], name: "index_artwork_logs_on_buyer_id"
  end

  create_table "artwork_tags", force: :cascade do |t|
    t.bigint "artwork_id"
    t.bigint "tag_id"
    t.index ["artwork_id"], name: "index_artwork_tags_on_artwork_id"
    t.index ["tag_id"], name: "index_artwork_tags_on_tag_id"
  end

  create_table "artworks", force: :cascade do |t|
    t.bigint "artist_id"
    t.bigint "artwork_category_id"
    t.bigint "buyer_id"
    t.string "title"
    t.boolean "published"
    t.string "description"
    t.string "overview"
    t.text "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.float "price"
    t.index ["artist_id"], name: "index_artworks_on_artist_id"
    t.index ["artwork_category_id"], name: "index_artworks_on_artwork_category_id"
    t.index ["buyer_id"], name: "index_artworks_on_buyer_id"
  end

  create_table "bids", force: :cascade do |t|
    t.bigint "artwork_id"
    t.bigint "buyer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "open"
    t.boolean "accepted"
    t.float "price"
    t.text "notes"
    t.index ["artwork_id"], name: "index_bids_on_artwork_id"
    t.index ["buyer_id"], name: "index_bids_on_buyer_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "title"
  end

  create_table "user_artwork_favorites", force: :cascade do |t|
    t.bigint "artwork_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_user_artwork_favorites_on_artwork_id"
    t.index ["user_id"], name: "index_user_artwork_favorites_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone_number"
    t.string "type"
    t.text "bio"
    t.string "image"
    t.string "location"
    t.string "slug"
    t.integer "featured_artwork_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
