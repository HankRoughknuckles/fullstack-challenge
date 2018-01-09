module ComicRepresenter
  include Roar::JSON

  property :id
  property :title
  property :dates
  property :thumbnail
  property :issueNumber
  property :description
  property :isbn
  property :characters
  collection :images
  property :creators
  property :variantDescription
end
