from models import db, Company






def comp_ey(ebit,enterprise_value):
	return ebit/enterprise_value

def comp_roc(ebit, working_capital, nfa):
	return ebit/(working_capital+nfa)