class Post < ApplicationRecord
    has_one_attached :image
  
    def image_url
        if image.attached?
            url = Rails.application.routes.url_helpers.rails_blob_path(image, only_path: true)
            "http://localhost:3001" + url
        else
            nil
        end
    end    
      
    def as_json(options = {})
      super(options.merge({ methods: [:image_url] }))
    end
end  