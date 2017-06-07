json.extract! message, :id, :room_id, :user, :content, :created_at, :updated_at
json.url message_url(message, format: :json)
