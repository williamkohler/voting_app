# Voting app for interview exercises

This Rails and React application is the starting point for our Voting app
interview exercise. You may not need all the various files included to complete
the assignment, but they are here in case they help you move faster! Please
modify anything you need to in order to meet the requirements and show us your
own approach.

## Features

The voting app implements the following functionality:

### Authentication and Voting Rules
* Users must login to participate in voting
* Login requires an email address, password, and zip code
* Each email address can vote exactly once
* Adding a write-in candidate automatically casts a vote for that candidate

### Candidate Management
* There are no predetermined candidates - all nominations are write-ins
* Maximum of 10 unique candidates allowed in the system
* Voters can see a list of all festival performers
* Voters can add new performers as write-in candidates

### Results Dashboard
* A public dashboard shows current vote tallies for each candidate
* The results dashboard is accessible without authentication
* Results are updated as votes are cast

### Accessibility Features
* Keyboard navigation support throughout the application
* Screen reader compatibility with ARIA labels and landmarks
* Clear focus indicators for interactive elements
* Descriptive error messages and form validation feedback
* Semantic HTML structure for logical content organization
* Consistent navigation and predictable interface patterns
* Support for browser text zoom up to 200%

### UI Component Library
The application uses Ant Design (antd) React components for several key benefits:

* Enterprise-ready components that follow React best practices
* Built-in accessibility features including ARIA support and keyboard navigation
* Consistent design language across all interactive elements
* Responsive components that work across desktop and mobile devices
* Rich form components with built-in validation and error handling

## Testing
The application includes RSpec tests for the voting functionality:

* vote_controller_spec tests the vote creation endpoint

## Installation

Your development environment should have:

* Ruby v3.1.2
* [Bundler](https://bundler.io/)
* Node v20.18.2
* Yarn v1.22.19
* git
* [SQLite3](https://www.sqlite.org/)

Initialize git, install the application, and initialize the database:

```sh
# First, download the zip file, unzip the directory,
# and navigate into the project directory. Then:
git init
git add .
git commit -m "Initial files provided"
bundle install
bundle exec rake db:migrate

# Install JS packages, including React
yarn install
```

## Running the app

```sh
bundle exec rails server
```

Visit [http://localhost:3000](http://localhost:3000) in your browser

For asset live reloading, run:
```sh
./bin/shakapacker-dev-server
```

If the assets ever get out of sync, delete `/public/packs` and restart your
Rails server (and your shakapacker-dev-server if it was running).

## Running tests

The included test suite uses Rspec and Capybara.

Check out `spec/requests/` for example tests.

```sh
# Run all tests
bundle exec rspec

# Run one test file
bundle exec rspec <path/to/the/file.rb>

# Run one test case inside a test file
bundle exec rspec <path/to/the/file.rb>:<line_number>
```

## Accessing the Rails console

```sh
bundle exec rails console
```

## Debugging

You can open up a debugging console by adding `binding.pry` anywhere in test or
application code.

Example:

```rb
def show
  binding.pry
  render json: { data: @my_object }, status: :ok
end
```

In this example, when the `show` method is hit during click testing or a test,
a debugger will open up in the terminal, where you can inspect values:

```rb
@my_object.id
@my_object.valid?
```

Step to the next line with `next`. Resume regular code execution or tests with
`continue`.
