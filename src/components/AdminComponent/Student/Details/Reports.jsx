import React, {useState} from 'react'
import s from "./Reports.module.css"
function Reports({reports}) {
    var [pag, setPag] = useState({
        from: 0,
        to: 7,
      });
    return (
        <div className={s.reports}>
            {reports.slice(pag.from, pag.to).map((x)=>(
                <div className={s.reportContainer}>
                    {x.value}
                </div>
            ))}
           <div className={s.pagContainer}>
            {
              <button
                style={pag.to/7 === 1 && {"visibility":"hidden"}}
                disabled={pag.from > 0 ? false : true}
                onClick={() => setPag({ from: pag.from - 9, to: pag.to - 9 })}
              >
                <svg
                  width="9"
                  height="11"
                  viewBox="0 0 9 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.70679 5.73303L8.176 10.2896L7.1156 11.173L0.585999 5.73303L7.1156 0.29303L8.176 1.17648L2.70679 5.73303Z"
                    fill="#4F4E4E"
                  />
                </svg>
                Anterior
              </button>
            }
            <div className={s.pagAct}>
              <h4 className={s.currentPage}>{pag.to / 7}</h4> de {Math.ceil(reports.length / 7)}
            </div>
            {
              <button
                style={pag.to>=reports.length && {"visibility":"hidden"}}
                disabled={pag.to < reports.length ? false : true}
                onClick={() => setPag({ from: pag.from + 7, to: pag.to + 7 })}
              >
                Siguiente
                <svg
                  width="9"
                  height="11"
                  viewBox="0 0 9 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.9395 5.49998L0.469749 0.941855L1.53025 0.0581055L8.0605 5.49998L1.53025 10.9419L0.469749 10.0581L5.9395 5.49998Z"
                    fill="#4F4E4E"
                  />
                </svg>
              </button>
            }
          </div>
        </div>
    )
}

export default Reports
