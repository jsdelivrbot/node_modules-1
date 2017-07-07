var TemplateService = function TemplateService () {};

TemplateService.register = function register (userImplementation) {
    TemplateService.current = userImplementation;
};

TemplateService.compile = function compile (template) {
    return TemplateService.current.compile(template);
};

TemplateService.current = {
    compile: function(template) {
        return template;
    }
};

export { TemplateService };

//# sourceMappingURL=services.js.map
