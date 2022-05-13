require('dotenv').config()
require('../config/mongo')
const News = require('../models/News')
const mongoose = require('mongoose')

const newsSeed = [
  {
    title: 'Alcaraz vence a Nadal por primera vez y jugará contra Djokovic la semifinal de Madrid',
    description: 'El murciano, tocado del tobillo al retorcérselo en una maniobra, rinde al balear en la Caja Mágica (6-2, 1-6 y 6-3) y se medirá con el serbio',
    author: 'Juan Pablo',
    content: 'De futuro nada: Carlos Alcaraz ya es de rabioso presente. Actualidad pura y dura. Kriptonita contra el orden establecido. Una realidad mayúscula. Lo verifica Rafael Nadal, al que doblega el murciano (6-2, 1-6 y 6-3, en 2h 28m) con un último golpe pasante que cae en el ángulo, desborda al mallorquín y marca un antes y un después. Dos veces se habían enfrentado, la primera hace un año y en el mismo marco, la Caja Mágica de Madrid, la otra en Indian Wells; dos veces había impuesto el balear su jerarquía. Sin embargo, el heredero triunfa con determinación, marca un punto de inflexión y se convierte en el semifinalista más joven en la historia del torneo. Y como la historia va de primeras veces, el guion le empareja ahora con Novak Djokovic (6-3 y 6-4 a Hubert Hurkacz), el siguiente gran desafío. Otra puerta a derribar. Será este sábado (16.00, La 1 y Movistar).',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Alcaraz_MCM22_%2827%29_%2852036462443%29.jpg/800px-Alcaraz_MCM22_%2827%29_%2852036462443%29.jpg'

  },
  {
    title: 'Siguen los retrasos en la misión Artemis: la NASA pasa el ensayo general del cohete SLS para junio',
    description: 'Tendremos que esperar un poco más para volver a nuestro satélite.',
    author: 'Pepe Pérez',
    content: 'La vuelta del ser humano a la Luna se sigue retrasando. El gigantesco "megacohete" que la NASA ha construido para esta histórica misión, el Space Launch System (SLS), ha sufrido una serie de problemas que le han impedido completar con éxito el conocido como "ensayo general húmedo". Después de realizar tres intentos de esta prueba critica, la agencia espacial estadounidense decidió tomarse el tiempo necesario para evaluar detenidamente la situación y superar las dificultades que han estado dilatando una y otra vez el esperado primer lanzamiento de Artemis.Ahora, el administrador asociado de la NASA, Jim Free, asegura que volverán a intentarlo entre principios y mediados de junio. Por consecuencia, el primer vuelo no tripulado del programa, la misión Artemis I, pega un salto en el calendario hasta, al menos, agosto de este año.',
    image: 'https://images-na.ssl-images-amazon.com/images/I/71nuIwweIRL.jpg'
  },
  {
    title: 'La nueva IA de Google ha logrado uno de los hitos más difíciles para una máquina: entender nuestros chistes',
    description: 'Los humanos somos difíciles. Sobre todo cuando nos ponemos a contar chistes y utilizar referencias culturales.',
    author: 'Juan Pablo',
    content: 'Precisamente entender el humor humano es uno de los grandes desafíos para las máquinas, pero ahora desde Google han mostrado grandes avances con su última inteligencia artificial. El equipo de Google Research ha anunciado su nuevo modelo Pathways, capaz de entender más de 540.000 millones de parámetros y lograr entender conceptos y relaciones que hasta la fecha parecían demasiado complejos para los ordenadores. El nuevo modelo utiliza la mayor configuración de TPUs hasta la fecha, combinando hasta 6.144 chips. La IA ha sido entrenada con material en inglés de todo tipo, desde libros a la Wikipedia, junto con conversaciones y código de Github. Y los resultados, según describe Google, superan a otros modelos como GLaM o GPT-3 en tareas como el razonamiento, responder preguntas o la comprensión del contexto.',
    image: 'https://i.blogs.es/94d229/ia-aplausos/1366_2000.jpg'
  }

]

;(async () => {
  try {
    await News.deleteMany()
    await News.insertMany(newsSeed)
    console.log('Seed created')
    mongoose.connection.close()
  } catch (error) {
    console.log(error)
  }
})()
