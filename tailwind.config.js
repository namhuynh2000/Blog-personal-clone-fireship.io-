/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#fff',
              // borderStyle: 'border-dotted',
              borderBottom: '2px dashed white',
              display: 'inline-block',
              fontFamily: 'Lalezar, cursive',
              fontSize: '35px',
              marginTop: '30px',
              marginBottom: '30px',
            },
            h2: {
              marginTop: '12px',
              marginBottom: '12px',
              color: 'rgb(178 190 205)',
              fontSize: '28px'
            },
            h3: {
              color: '#fff',
            },
            h4: {
              color: '#fff',
            },
            h5: {
              color: '#fff',
            },
            h6: {
              color: '#fff',
            },
            p: {
              color: '#D1D5DB',
            },
            code: {
              color: '#fff',
              // fontFamily: 'VT323, monospace',
              backgroundColor: '#00000080',
              display: 'block',
              borderWidth: '2px',
              borderColor: 'rgb(42 46 53)',
              padding: '20px',
              marginTop: '20px',
              marginBottom: '20px',
              width: '80%'
            },
            blockquote: {
              color: '#D1D5DB',
              backgroundColor: 'rgb(42 46 53)',
              width: '80%'
            },
            strong: {
              color: '#fff',
            },
            li: {
              color: '#D1D5DB'
            },
            a: {
              color: '#3B82F6',
              textDecoration: 'none',
              '&:hover': {
                color: '#FB923C',
                cursor: 'pointer'
              },
            },
          },
        },
      },
    },
    fontFamily: {
      'code': 'VT323, monospace',
      'title': 'Lalezar, cursive', //Chữ nổi bật
      'normal': 'Poppins, sans-serif'
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}