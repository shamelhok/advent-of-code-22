import re

testinput='''Monkey 0:
    Starting items: 98, 97, 98, 55, 56, 72
    Operation: new = old * 13
    Test: divisible by 11
    If true: throw to monkey 4
    If false: throw to monkey 7

    Monkey 1:
    Starting items: 73, 99, 55, 54, 88, 50, 55
    Operation: new = old + 4
    Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 6

    Monkey 2:
    Starting items: 67, 98
    Operation: new = old * 11
    Test: divisible by 5
    If true: throw to monkey 6
    If false: throw to monkey 5

    Monkey 3:
    Starting items: 82, 91, 92, 53, 99
    Operation: new = old + 8
    Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 2

    Monkey 4:
    Starting items: 52, 62, 94, 96, 52, 87, 53, 60
    Operation: new = old * old
    Test: divisible by 19
    If true: throw to monkey 3
    If false: throw to monkey 1

    Monkey 5:
    Starting items: 94, 80, 84, 79
    Operation: new = old + 5
    Test: divisible by 2
    If true: throw to monkey 7
    If false: throw to monkey 0

    Monkey 6:
    Starting items: 89
    Operation: new = old + 1
    Test: divisible by 3
    If true: throw to monkey 0
    If false: throw to monkey 5

    Monkey 7:
    Starting items: 70, 59, 63
    Operation: new = old + 3
    Test: divisible by 7
    If true: throw to monkey 4
    If false: throw to monkey 3'''

class Monkey:
    def __init__ (self,number,items,op_string,test_divisor,test_iftrue,test_ifFalse):
        self.count=0
        self.number=number
        self.items= items
        def op (old):
            return eval(op_string)
        self.divisor=test_divisor
        self.ifTrue=test_iftrue
        self.ifFalse=test_ifFalse
        self.op=op
        def test (num):
            # remainder= num % test_divisor
            # inspected = self.op(remainder)
            return test_iftrue if (num % test_divisor==0) else test_ifFalse
        self.test=test

def extractMonkeys(input):
    monkeyTexts= input.split('\n\n')
    monkeys={}
    for text in monkeyTexts:
        lines = text.split('\n')
        monkey_number=int(re.findall('\d',lines[0])[0])
        # print(monkey_number)
        # eval("monkeys[monkey_number]['items'].extend(["+lines[1].split(':')[1]+"])")
        items= eval('['+lines[1].split(':')[1]+"]")
        op_string=lines[2].split('=')[1]
        test_divisor=int(lines[3].split('by')[1])
        ifTrue= int(lines[4].split('monkey')[1])
        ifFalse=int( lines[5].split('monkey')[1])
        monkeys[monkey_number]= Monkey(monkey_number,items,op_string,test_divisor,ifTrue,ifFalse)

        # eval( "monkeys[monkey_number]['items'].extend(["+lines[1][15:]+"])")
        # print(lines[2].split('=')[1])
        # monkeys[monkey_number]['op'] = def(old):
        #     eval(lines[2].split('=')[1])
        # monkey.op=eval(`(old)=>{return Math.round(`+lines[2].split('=')[1]+`)}`)
        # divisor=parseInt(lines[3].split('by')[1])
        # monkey.test=(num)=>{return Math.round(num)%divisor===0?ifTrue:ifFalse}
        # monkey.count=0
    print(monkey_number)
    return monkeys

monkeys=extractMonkeys(testinput)
print(monkeys)
print(monkeys[0].op(2))
print(monkeys[1].op(2))
print(monkeys[2].op(2))
print(monkeys[3].op(2))

divisor=1
for key in monkeys:
    divisor*= monkeys[key].divisor
print(divisor)

def round2 (monkeys):
    for key in monkeys:
        monkey =monkeys[key]
        while(len(monkey.items)>0):
            item= monkey.items.pop(0)% divisor
            item= monkey.op(item)
            monkey.count+=1
            target = monkey.test(item)
            monkeys[target].items.append(item)
        
for i in range(10000):
    round2(monkeys)
    if(i==0 or i==19 or i==999):
        print({
            0:monkeys[0].count,
            1:monkeys[1].count,
            2:monkeys[2].count,
            3:monkeys[3].count,
        })

counts=[]
for key in monkeys:
    counts.append(monkeys[key].count)

print(109795*120569)
