# RPE Calculator

## Project Description

The RPE Calculator is a web application designed to help users calculate their estimated one-rep max (1RM) based on the weight lifted, the number of repetitions, and the Rate of Perceived Exertion (RPE). The application also allows users to save their lifting history and filter it by lift type.

## Features

- Calculate estimated one-rep max using various formulas.
- Save lifting history with details such as weight, reps, RPE, and lift type.
- Filter history by lift type (Squat, Bench, Deadlift).
- Localization support for multiple languages (English, Polish, French, Japanese, German).

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod for form validation
- Local storage for saving history

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naroors/rpe-calculator.git
   cd rpe-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

1. **Select the lift type** (Squat, Bench, or Deadlift).
2. **Input the weight** you plan to lift.
3. **Select the number of repetitions** you can perform at that weight.
4. **Adjust the RPE slider** to reflect your perceived exertion.
5. Click **"Save to History"** to store your entry.
6. View your lifting history and filter it by lift type.

## Localization

The application supports multiple languages. The localization files are located in the `messages` directory. Each language has its own JSON file containing the necessary translations.

### Supported Languages

- English (`en.json`)
- Polish (`pl.json`)
- French (`fr.json`)
- Japanese (`ja.json`)
- German (`de.json`)

To add a new language, create a new JSON file in the `messages` directory and follow the structure of the existing files.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the Next.js community for their excellent documentation and support.
- Special thanks to the contributors of the libraries used in this project.
