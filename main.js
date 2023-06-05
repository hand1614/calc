"use strict"

import { textarea_resize } from "https://hand1614.github.io/flex_textarea/flex_textarea.js" ;
import { submit_to_query, query_to_form } from "https://hand1614.github.io/form_query_io/form_query_io.js" ;

// 0 <= n
const fact = ( n, ret = 1 ) => n ? fact( n - 1, ret * n ) : ret ;

// 0 <= r
const npr = ( n, r, ret = 1 ) => r ? npr( n - 1, r - 1, ret * n ) : ret ;

const ncr = ( n, r ) => npr( n, r ) / fact( r ) ;

/*
    deck   := 山札の枚数
    hand   := 手札の枚数
    input  := 引きたいカードの投入枚数の総和
    output := 引きたい枚数の総和
    _ncr   := 引きたいカードの組み合わせの総乗
    0 <= output <= hand input <= deck
*/
const probability_of_draw = ( deck, hand, input, output, _ncr ) => _ncr * ncr( deck - input, hand - output ) / ncr( deck, hand ) ;

const remove_all_childs = node => { while( node.firstChild ) remove_all_childs( node.removeChild( node.firstChild ) ) ;  }

function output_sum_cards () {
    this.form[ this.dataset[ "out" ] ].value = this.value.split( "\n" ).reduce( ( acc, v ) => acc + ( Number.parseInt( v.split( " " )[ 0 ] ) || 0 ), 0 ) ;
}

function init () {
  query_to_form( document.getElementById( "form" ) ) ;
  output_sum_cards.call( document.getElementById( "card" ) ) ;
  document.getElementById( "form" ).addEventListener( "submit",   submit_to_query  ) ;
  for( const element of document.querySelectorAll( ".flex_textarea > textarea.textarea" ) ) element.addEventListener( "input", textarea_resize ) ;
  // document.getElementById( "card"   ).addEventListener( "focusout", output_sum_cards ) ;
}

window.addEventListener( "load", init ) ;
