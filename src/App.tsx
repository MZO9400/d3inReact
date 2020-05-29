import React from 'react';

let d3 = window.d3;

interface State {
    count: number;
}
interface DATA {
    cx: number,
    cy: number,
    r: number,
    color: string
}
const getRandomColor: Function = (): string => "#" + ((1 << 24) * Math.random() | 0).toString(16)
const getRandomData: Function = (count: number) : DATA[] => {
    let data: DATA[] = [];
    for (let i = 0; i < count; i++) {
        data.push({
            cx: (Math.random() * 10000) % window.innerWidth,
            cy: (Math.floor(Math.random() * window.innerHeight)),
            r: (Math.random() * 25) + 10,
            color: getRandomColor()
        })
    }
    return data;
}

class App extends React.Component<{}, State> {
    state: State = {
        count: 0
    }
    svg!: SVGSVGElement;
    componentDidUpdate = (): void => {
        let data: DATA[] = getRandomData(this.state.count);
        let value = d3.select(this.svg)
            .selectAll("circle")
            .data(data);
        value
            .enter()
            .append('circle')
            .style('fill', i => i.color)
            .attr('cx', Math.random() * window.innerWidth )
            .attr('cy', (Math.floor(Math.random() * window.innerHeight)))
            .merge(value as any)
            .transition()
            .duration(Math.floor(Math.random() * 3000))
            .style('fill', i => i.color)
            .attr('cx', i => i.cx)
            .attr('cy', i => i.cy)
            .attr('r', i => i.r)
        value
            .exit()
            .transition()
            .duration(Math.floor(Math.random() * 3000))
            .attr('r', 0)
            .remove();

    }

    render = (): React.ReactNode => {
        return <svg
            width={window.innerWidth}
            height={window.innerHeight}
            ref={(ref: SVGSVGElement) => this.svg = ref}
            tabIndex={0}
            onKeyDown={(e) => {
                let value: number;
                switch (e.key) {
                    case "-":
                        value = -1;
                        break;
                    case "+":
                    case "=":
                        value = 1;
                        break;
                    default:
                        value = 0;
                }
                this.setState(state => {
                    return {
                        "count": state.count + value
                    }
                })
            }}
        />;
    }
}

export default App;
