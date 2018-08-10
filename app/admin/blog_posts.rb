ActiveAdmin.register BlogPost do
# See permitted parameters documentation:
# https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
#
# permit_params :list, :of, :attributes, :on, :model
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end
  menu parent: 'Blog'

  index do
    selectable_column
    column "Image" do |post|
      image_tag post.image, class: 'admin-img'
    end
    # column :image
    column :title
    column :description
    column :published
    column :created_at
    column :blog_category
    column :overview
    actions
  end

  # form do |f|
  #   f.inputs "Attachment", :multipart => true do
  #     f.input :image, :as => :file, :hint => image_tag(f.object.image)
  #     f.input :image_cache, :as => :hidden
  #   end
  # end

end
