const { app } = require('../index')
const supertest = require('supertest')

const api = supertest(app)

const initialNews = [
  {
    title: 'Alcaraz vence a Nadal por primera vez y jugará contra Djokovic la semifinal de Madrid',
    description: 'El murciano, tocado del tobillo al retorcérselo en una maniobra, rinde al balear en la Caja Mágica (6-2, 1-6 y 6-3) y se medirá con el serbio',
    author: 'Juan Pablo',
    content: 'De futuro nada: Carlos Alcaraz ya es de rabioso presente. Actualidad pura y dura. Kriptonita contra el orden establecido. Una realidad mayúscula. Lo verifica Rafael Nadal, al que doblega el murciano (6-2, 1-6 y 6-3, en 2h 28m) con un último golpe pasante que cae en el ángulo, desborda al mallorquín y marca un antes y un después. Dos veces se habían enfrentado, la primera hace un año y en el mismo marco, la Caja Mágica de Madrid, la otra en Indian Wells; dos veces había impuesto el balear su jerarquía. Sin embargo, el heredero triunfa con determinación, marca un punto de inflexión y se convierte en el semifinalista más joven en la historia del torneo. Y como la historia va de primeras veces, el guion le empareja ahora con Novak Djokovic (6-3 y 6-4 a Hubert Hurkacz), el siguiente gran desafío. Otra puerta a derribar. Será este sábado (16.00, La 1 y Movistar).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Alcaraz_MCM22_%2827%29_%2852036462443%29.jpg'
  },
  {
    title: 'Siguen los retrasos en la misión Artemis: la NASA pasa el ensayo general del cohete SLS para junio',
    description: 'Tendremos que esperar un poco más para volver a nuestro satélite.',
    author: 'Pepe Pérez',
    content: 'La vuelta del ser humano a la Luna se sigue retrasando. El gigantesco "megacohete" que la NASA ha construido para esta histórica misión, el Space Launch System (SLS), ha sufrido una serie de problemas que le han impedido completar con éxito el conocido como "ensayo general húmedo". Después de realizar tres intentos de esta prueba critica, la agencia espacial estadounidense decidió tomarse el tiempo necesario para evaluar detenidamente la situación y superar las dificultades que han estado dilatando una y otra vez el esperado primer lanzamiento de Artemis.Ahora, el administrador asociado de la NASA, Jim Free, asegura que volverán a intentarlo entre principios y mediados de junio. Por consecuencia, el primer vuelo no tripulado del programa, la misión Artemis I, pega un salto en el calendario hasta, al menos, agosto de este año.',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71nuIwweIRL.jpg'
  }
]

const getAllNews = async () => {
  const response = await api.get('/news')
  return {
    title: response.body.data.map(news => news.title).toString(),
    response
  }
}

module.exports = {
  api,
  initialNews,
  getAllNews
}
