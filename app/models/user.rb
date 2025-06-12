class User < ApplicationRecord
  after_initialize :set_default_voted_status, if: :new_record?

  private

  def set_default_voted_status
    self.voted ||= false
  end
end
