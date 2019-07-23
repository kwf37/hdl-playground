// Verilated -*- SystemC -*-
// DESCRIPTION: Verilator output: Primary design header
//
// This header should be included by all source files instantiating the design.
// The class here is then constructed to instantiate the design.
// See the Verilator manual for examples.

#ifndef _Vour_H_
#define _Vour_H_

#include "systemc.h"
#include "verilated_sc.h"
#include "verilated_heavy.h"

class Vour__Syms;

//----------

SC_MODULE(Vour) {
  public:
    
    // PORTS
    // The application code writes and reads these signals to
    // propagate new values into/out from the Verilated model.
    sc_in<bool> clk;
    
    // LOCAL SIGNALS
    // Internals; generally not touched by application code
    
    // LOCAL VARIABLES
    // Internals; generally not touched by application code
    VL_SIG8(__Vcellinp__our__clk,0,0);
    VL_SIG8(__Vclklast__TOP____Vcellinp__our__clk,0,0);
    
    // INTERNAL VARIABLES
    // Internals; generally not touched by application code
    Vour__Syms* __VlSymsp;  // Symbol table
    
    // PARAMETERS
    // Parameters marked /*verilator public*/ for use by application code
    
    // CONSTRUCTORS
  private:
    VL_UNCOPYABLE(Vour);  ///< Copying not allowed
  public:
    SC_CTOR(Vour);
    virtual ~Vour();
    
    // API METHODS
  private:
    void eval();
  public:
    void final();
    
    // INTERNAL METHODS
  private:
    static void _eval_initial_loop(Vour__Syms* __restrict vlSymsp);
  public:
    void __Vconfigure(Vour__Syms* symsp, bool first);
  private:
    static QData _change_request(Vour__Syms* __restrict vlSymsp);
  public:
    static void _combo__TOP__1(Vour__Syms* __restrict vlSymsp);
  private:
    void _ctor_var_reset();
  public:
    static void _eval(Vour__Syms* __restrict vlSymsp);
  private:
#ifdef VL_DEBUG
    void _eval_debug_assertions();
#endif // VL_DEBUG
  public:
    static void _eval_initial(Vour__Syms* __restrict vlSymsp);
    static void _eval_settle(Vour__Syms* __restrict vlSymsp);
    static void _sequent__TOP__3(Vour__Syms* __restrict vlSymsp);
} VL_ATTR_ALIGNED(128);

#endif // guard
