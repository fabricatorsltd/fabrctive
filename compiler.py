import os
import glob
import jsmin


class JSCompiler:

    def __init__(self, folder, js_files, output_file):
        self.folder = folder
        self.js_files =js_files
        self.output_file = output_file
        self.debug_pattern = ['@@@IF NOT BUILD@@@', '@@@ENDIF@@@']

    def compile(self):
        with open(self.output_file, 'w') as outfile:
            for js_file in self.js_files:
                with open( os.path.join(self.folder, js_file), 'r') as infile:
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


def list_from_dir(dir):
    components = []
    for file in glob.glob(dir+'/*.js'):
        components.append(file)
    return components

if __name__ == '__main__':
    js_files = [
        'core.js',
        'helper.js',
    ] + list_from_dir("helpers") + [
        'component.js',
    ] + list_from_dir("components") + [
        'fabr.js',
    ]
    compiler = JSCompiler('src', js_files, 'fabr.min.js')
    compiler.compile()
