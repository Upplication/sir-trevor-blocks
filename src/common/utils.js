var $ = require('jquery');
var SirTrevor = require('sir-trevor-js');

module.exports = {

	loadLocale: function(localeName, locale) {
		SirTrevor.Locales[localeName] = SirTrevor.Locales[localeName] || {};
		$.extend(true, SirTrevor.Locales[localeName], locale);
	},

	loadMixin: function(mixin) {
	    SirTrevor.BlockMixins[this._classify(mixin.mixinName)] = mixin;
	    SirTrevor.Block.prototype.availableMixins.push(mixin.mixinName.toLowerCase());
	},

	loadBlock: function(block) {
		SirTrevor.Blocks[this._classify(block.prototype.type)] = block;
	},

	_titleize: function(str){
		if (str === null)
			return '';
		str  = String(str).toLowerCase();
		return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
	},

	_classify: function(str){
		return this._titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
	},
}