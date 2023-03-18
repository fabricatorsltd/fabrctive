import os
import glob
import jsmin


class JSCompiler:

    def __init__(self, js_files, output_file):
        self.js_files = js_files
        self.output_file = output_file
        self.debug_pattern = ['@@@IF NOT BUILD@@@', '@@@ENDIF@@@']

    def compile(self):
        with open(self.output_file, 'w') as outfile:
            for js_file in self.js_files:
                with open(js_file, 'r') as infile:
                    lines = infile.readlines()

                    # Skip any lines between the debug patterns
                    skip = False
                    for line in lines:
                        if self.debug_pattern[0] in line:
                            skip = True
                        elif self.debug_pattern[1] in line:
                            skip = False
                        elif not skip:
                            outfile.write(line)

        with open(self.output_file, 'r') as infile:
            minified = jsmin.jsmin(infile.read())

        with open(self.output_file, 'w') as outfile:
            outfile.write(minified)


if __name__ == '__main__':
    js_files = [
        'core.js',
        'component.js',
        'components/form.js',
        'components/link.js',
        'reactive.js',
    ]
    compiler = JSCompiler(js_files, 'reactive.min.js')
    compiler.compile()
