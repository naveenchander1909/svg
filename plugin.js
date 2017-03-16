(function($){

    var plugin_const = function(){
        this.create = function(){

        }
    };

    $.fn.myChart = function(options){
        var $this = this,
            svg = $('<svg class="chart"></svg>'),
            NS = "http://www.w3.org/2000/svg",
            y = 0,
            x= 0,
            constant = -200,
            pos_top = 18;

        this.each(function(){

            settings = $.extend(
                {
                    type: 'line',
                    position: 'horizontal',
                    data: {
                        dataArray: [20, 80, 120, 10, 30],
                        dataLabel: ['label-1', 'label-2', 'label-3', 'label-4', 'label-5']
                    }
                }, options
            );

            var _dataLength = settings.data.dataArray,
                _dataLabelLength = settings.data.dataLabel;

            var line = function(rect, vertical){
                    $this.append(svg);
                    var barHeight = 19,
                        padding = 5;
                    for (var i=0; i < _dataLength.length && _dataLabelLength.length; i++){
                        var ele = document.createElementNS(NS, rect);
                        var txt = document.createElementNS(NS, 'text');

                        if(settings.position == "vertical"){

                            ele.setAttribute('width', 19);
                            ele.setAttribute('height', _dataLength[i]);
                            ele.setAttribute('x', x+=20);
                            ele.setAttribute('y', constant);
                            ele.setAttribute('transform', 'translate(0,20)');
                            ele.setAttribute('transform', 'scale(1,-1)');

                            txt.setAttribute('transform', 'translate(0,20)');
                            txt.setAttribute('transform', 'scale(1,-1)');
                            txt.setAttribute('y', _dataLength[i]+10);
                            txt.setAttribute('x', pos_top+=10);
                        } else{
                            ele.setAttribute('width', _dataLength[i]);
                            ele.setAttribute('height', barHeight);
                            ele.setAttribute('y', y+=(barHeight+padding));

                            txt.setAttribute('x', _dataLength[i]+5);
                            txt.setAttribute('y', pos_top+=(barHeight+padding));
                        }

                        var textNode = document.createTextNode(_dataLabelLength[i]);
                        txt.appendChild(textNode);
                        $('.chart').append(ele, txt);

                    }
            };

            var circle = function(circle){
                $this.append(svg);
                for (var i=0; i<_dataLength.length; i++){
                    var ele = document.createElementNS(NS, circle);

                    var sum = _dataLength.reduce(add, 0);

                    function add(a, b) {
                        return a + b;
                    }

                    var cal = 360*_dataLength[i]/sum;

                    /*var calCalculate = cal+_dataLength[i-1];*/
                    console.log('cal', cal);

                    ele.setAttribute('d', 'M115,115 L115,0 A115,115 1 0,1 196.317, 33.6827 z');
                    ele.setAttribute('transform', 'rotate('+ _dataLength[i] + ', 115, 115)');
                    $('.chart').append(ele);

                }
            };

            var create = function(){
                switch(settings.type){
                    case 'line':
                        line('rect', 'vertical');
                        break;
                    case 'circle':
                        circle('path');
                        break;
                    default:
                        alert('no-line');
                }
            };

            init = function(){
                create();
            };

            init();
        });
    }

})(jQuery);