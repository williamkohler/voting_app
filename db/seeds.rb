# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create default candidates
candidates = [
  { name: "Bjork", votes: 0 },
  { name: "Jeff Buckley", votes: 0 },
  { name: "Portishead", votes: 5 },
  { name: "Talking Heads", votes: 6 },
  { name: "Tom Waits", votes: 10 }
]

candidates.each do |candidate_data|
  Candidate.find_or_create_by!(name: candidate_data[:name]) do |candidate|
    candidate.votes = candidate_data[:votes]
  end
end
