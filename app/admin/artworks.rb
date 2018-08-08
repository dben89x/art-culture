ActiveAdmin.register Artwork do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:artist, :artwork_category, :title, :user, :published, :description, :overview, :bio, :price]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
# end

  menu parent: 'Art'
  index do
    selectable_column
    column :title
    column :artist
    column :description
    column :price
    column :bio
    column :artwork_category
    column "Owner", :user
    column :published
    actions
  end
end
