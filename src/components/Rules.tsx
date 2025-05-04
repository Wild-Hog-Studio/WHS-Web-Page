import { useState, type FC } from "react";

const rules = [
    "🏆 Reglamento del Torneo de Kodem - Formato Suizo 🏆",
  
    "📅 1. Información General",
    "📅 Fecha de inicio: 5 de mayo",
    "📌 Última fecha para registro: 3 de mayo",
    "📌 Publicación de las primeras partidas: 4 de mayo",
    "⏳ Duración estimada: 4 semanas",
    "🎲 Formato: Suizo",
    "🖥️ Plataforma de gestión: Challonge",
    "💰 Precio de entrada: 100 pesos (pagado a través de transferencia)",
    "📌 Organización de partidas: Cada domingo se definirán los enfrentamientos de la semana según el avance del torneo.",
    "⚡ Reglas especiales: Cada semana tendrá una temática distinta (energías, protectores o bios), lo que determinará la mecánica de selección para construir barajas.",
  
    "⚔️ 2. Organización de Partidas",
    "🎮 Las partidas serán programadas entre los jugadores asignados en cada ronda.",
    "⏰ Los jugadores deberán coordinar entre sí para establecer la fecha y hora de su enfrentamiento dentro del periodo asignado.",
    "⚠️ En caso de retrasos o conflictos de horario, se deberá notificar al organizador del torneo.",
    "👀 Lo ideal será que haya un tercero supervisando la partida, aunque esto dependerá de la disponibilidad del TO (Yeriko).",
    "📺 Algunas partidas podrían ser transmitidas por Twitch/YerikoTV, pero solo aquellas jugadas en horario especial.",
  
    "🏁 3. Top 4 y Eliminación Directa",
    "Los 4 jugadores con más puntos al finalizar el suizo avanzarán a eliminación directa.",
    "Se emparejarán: 1° vs 4° y 2° vs 3°.",
    "Las partidas serán al mejor de tres (2 de 3).",
    "🔁 Detalles del formato:",
    "• El primer duelo será libre de restricciones.",
    "• En los siguientes duelos se usará temática (energía/protector/bio).",
    "• Tras cada partida, el jugador que perdió el duelo anterior elegirá cuál temática se usará en la siguiente.",
    "• Se dará un descanso de 15 minutos entre duelos para permitir ajustes de baraja.",
  
    "📜 4. Envío y Verificación de Barajas",
    "📩 Antes de cada partida, los jugadores deben enviar su baraja al Tournament Organizer (TO).",
    "🔍 Si un jugador sospecha de irregularidades, puede solicitar revisión.",
    "❌ Si se detecta una incongruencia, el jugador que hizo el reclamo recibirá la victoria por default.",
  
    "🎴 5. Mecánica de Selección Semanal",
    "Cada semana tendrá una temática que afectará la construcción de barajas:",
    "• Semana 1: Energías — Cada jugador recibe 3 pares de energías.",
    "• Semana 2: Protectores — Cada jugador recibe 3 protectores.",
    "• Semana 3: Bios — Cada jugador recibe 3 bios.",
    "• Semana 4: Energías — Cada jugador recibe 3 pares de energías.",
    "🌀 El oponente baneará uno de los tres elementos.",
    "🎯 El jugador deberá elegir uno de los dos restantes y construir su baraja en torno a ese elemento.",
  
    "🛡 6. Reglas Especiales",
    "Semana 2 (Protectores): Se podrá llevar un segundo protector de libre elección, pero el protector temático debe entrar primero.",
    "Semanas 1 y 4 (Energías):",
    "• Demotico no aparecerá en los sorteos.",
    "• Aun así, los jugadores podrán incluir 1 Demotico como soporte en su baraja.",
    "Victoria por inasistencia: Si un jugador no se presenta a la partida y no hay justificación, se marcará victoria por default 10-7 a favor del oponente.",
  
    "⚠️ 7. Erratas y Restricciones",
    "🚫 'Recipiente de vida' no puede usarse contra un Bio o Ravas.",
    "🦖 La pasiva de 'Kumba' solo puede activarse una vez con 'Cementerio de Dinosaurios'.",
  
    "🤝 8. Conducta y Penalizaciones",
    "✅ Se espera una actitud respetuosa y deportiva de todos los participantes.",
    "❌ Cualquier intento de hacer trampa, manipular resultados o actitud antideportiva podrá resultar en descalificación inmediata.",
    "⚖️ Las decisiones del TO serán finales e inapelables.",
  
    "📩 9. Contacto",
    "Para cualquier duda o consulta, comunícate con la organización del torneo por los medios designados. 📬",
    
    "❗ Disclaimer",
    "Este torneo es un evento no oficial, organizado de manera independiente por la comunidad.",
    "No está afiliado ni respaldado por los creadores oficiales de Kodem.",
    "Todos los nombres, mecánicas y elementos del juego pertenecen a sus respectivos dueños.",
    "Este evento se realiza con fines recreativos y comunitarios."
  ];

  const Rules: FC = () => {
    const [show, setShow] = useState(false);
  
    return (
      <section className="w-full px-4 py-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">REGLAS DEL TORNEO</h2>
  
        <button
          onClick={() => setShow(!show)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded transition mb-6"
        >
          {show ? "Ocultar reglas" : "Mostrar reglas"}
        </button>
  
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            show ? "max-h-[4000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
<div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 shadow-md text-left space-y-2">
            <ol className="list-none space-y-1 text-sm leading-relaxed">
              {rules.map((rule, idx) => {
                    const isSectionTitle = /^\D*\d+\./.test(rule);
                return (
                  <li
                    key={idx}
                    className={isSectionTitle ? "text-center font-bold text-cyan-300 text-2xl mt-6 mb-4" : ""}
                  >
                    {rule}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    );
  };
  
  export default Rules;