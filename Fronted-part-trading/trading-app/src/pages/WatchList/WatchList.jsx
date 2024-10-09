import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { WatchIcon } from "lucide-react";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { handler } from "tailwindcss-animate";
export default function WatchList() {
  function handlerToRemove(id) {}

  return (
    <div className="lg:p-15 p-5">
      <h1 className="font-bold text-3xl pb-5">WatchList</h1>
      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] py-5">Coin</TableHead>
            <TableHead className="text-center">SYMBOLE</TableHead>
            <TableHead className="text-center">VOLUME</TableHead>
            <TableHead className="text-center">MARKET CAP </TableHead>
            <TableHead className="text-center">24 HR</TableHead>
            <TableHead className="text-center"> PRICE </TableHead>
            <TableHead className="text-center text-red-800"> Remove </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
            <TableRow className="">
              <TableCell className="font-medium flex items-center  gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABgQFAQIHAwj/xABMEAABAwMBBAQICQkFCQEAAAABAgMEAAURIQYSMUETUWHRFBUicYGRobEHFiMyVFaSlMEkQkRSYnOT4fAzQ0VjcjQ1NlNVZYKE0ib/xAAaAQACAwEBAAAAAAAAAAAAAAAABAECAwUG/8QALxEAAgIBAgEJCQEBAAAAAAAAAAECAxEEEiEFFDFBUVJhkaETFSIjMkKBsdFx8P/aAAwDAQACEQMRAD8A7jRRRQAUUUUAFFaqOBxpUv23VutqlMxAZskHBDZwhJ7Vd2apOyMFmTNK6p2vEFkbM1FmXGHCGZcplkcflFgVyS67X3u5KUkyTHaP92wN328T66oDlSipeVKPEnUmkp6+P2o6tXI83xslj/Dsb+22zzBwq4pWf8tta/aBivD4/wCz2ceEPefoF91ci17aNaweut7ENrkejtf/AH4Oxs7bbPPEAXEIP+Y0tPtIxVvDuUKcnehy2Xx/lrBrgxGnCsD5wVqFA5BGmPNVo6+f3IznyNX9kmfQgNbVxe17X3q2EJRKU+0P7t/yx6+Ptp6sW3dvuJSzM/IpCtAFnKFHsV34purV12PHQznX8nX1ccZXgN1FahWcdtbU0IBRRRQAUUUUAFFFFABUW43CLbYi5U11LTKBkqPPsHWeys3GbHt0N2XLcCGWxlR/Adtca2m2gk3+aXXSURkE9AyOCB1n9rtpbUahVLxHdHo5aiXZFdLGa5beW64MrjSLVJcYUdQJG5vDtx7qphddlcY+LTv3tXfS2KDXKlqJy4yw/wAHoIaGqCxHK/LGQXXZX6tO/e1d9HjXZX6sufe1d9LVXOythbvT0xcmQ62yxuJSlogEqIJOcjs9tWhOU3hJeSM7666I7pOXm/6TfGuyv1Zd+9q76x422WB/4adH/tq76pts4kfZyYw0wp95Dre98qsZBz2CvOzxmJ1ydRLkPNstsF0oYTla8cceYa+itNs92OHkhdW0OvfmXm/6X3jXZX6su/e1d9HjbZb6tO/e1d9Uu2UJjZ9cMwnXpDclsqy4oEcsEYFQkklIyMKxkjqqljnDpS8kbUKm5fC5eb/ozeNdlfq0797V30eNdltc7Mu/e1d9LWtGtZ+2fYvJDHNIdr82Ptu28t1uYTGi2qShhJ0Bk7+6Oze92afrbcYtyiIlQnQ4yvgRxB6iORrgmtW+zd+k2Gb0zPlsLIDzPJY/A9tM0aySlifQJankuEo5q+r9nbxwoqJbZ8e5Q2pcRwLZcGQfwPbUuuqmmso88008MKKKKkgKwTWarb5L8FiEIOHHPJTjl1mqWTVcHJ9RaEHOSiusXdsLc5fnWmm7vEjxW9ejVqVL6zqOFLp2FA1N9g469099WaQUhA3ioDiSeNbHjnB9Fefnq1OW6UfU79MLKobYy4f4VR2F5+PYGP8AQe+sK2EOmL3COeJ3DoPXVqSd08OHEVBs2zduuOzcRx5paZLzAUp9C1b2918cVrQ4XZ+H9lbtTdVj4/RHiNhFEA+PIQ7Nw/8A1XhaUyNmL1NSt5uTbQppEp5sYDRKcpXz01wasLPs/D3XIlztwMqOABISVbj6eShrx6x31eQbXBhNOtxoqW0PY6VKsnf0xrnsNNxrjF5SFLdTZbHbJ/oQPhRbD19tTJWE9IkJKjyBXjPtqwg7NFu5TUw5rLs+F0L0Z9v5pJ3soPYQMH+hTQLJDUlDUuI1JbZGGFuoClJR+qSeQ5HqxUmBAiQQRDjMsBYyrokABWOH4+2tOBgpNR29Rzj4UX0yE2p/dU1vNr321cWyCAUnzEVes7DhbaVC+QsKSDkpPfTLdLNBuqkGcwh0JyMKHI8cEag6Cq9FiT4OldtuUpkFOUodX0zfqV5WPTWdsdyXDJrRdKpvDxkrPiMCcePoGerc/nWfiKOd+gfY/nQ3cpUOSYd6jiOsHCZCDlpzJwCDy10181Wnlb2eXDFIWWezeJQ9WdGF1s1mNnoipTsLzN7hJJ60/wA62+In/fYP2D31bKzyGevXWgeas+cR7nqy+6/v+iJmyFrcsDziF3iI/Gd16JIwQrrGvrpyTSDy1pssMzwqH5Z+Ub8lX4GunodWpv2eMHK11El81vPaWlFYorpnOClnaBMqRMw1HeW22nAKUE5PE/12UyrICSToBrSYu5TFLURIcSCokAHhXP5QsgoKMusd0UJOblHqPIQZY4RXgkcuiNZ8DlAkmM/qf+Wa3Fwm5P5U7r+1WF3KWkEqlO4HbXG+R4nT+d4Ghgyz+jP8Mf2Z7qqHLHtFGisR7TMkIQxogPxwQkAYGMJzz41d+MZv0l310eMZvOS5660rtrrfwtlJ12z6cepFs8i7MTE268qbW8povNupZKN9KThScdYJScgeirCfvPNuRwJLR8ndkNDgSeI68EajqPVmlm8XpUPaizSJr5DPRvNuKXnASrd/EJPopqXPhIYMhUtjoAM9J0id3HnzXTrnvipCFkXGTTEW/wC1t+tkpi3uR4yJQUEKdUglD2T5K066dvGrhKdu0JyEW5Z4lJZd19OKS/hGvca7zWFQVEtxgUh3hvHjkdg666U3cpxbSfCXM9eeNUvuVWMl6anZnBFZuV6htdNfLMUNAfKSIoUoNjGpUk67vXgmrpJS9HCmnAUqG8HG9c55jr66gGfMVoqS7jmM8aj7LI6awdE4CWS68hvXGWukUE+zFRTfG3OOoLaZV9JL341wL9unNtrcCVBSDqHE8CpP4jiD6CU3ZuRNi7QTNnH1KkCOFGOdSrdGNO0YIPZTHcNn+lddftklUeSFF1A5Jf8A1gepXBQ1B48Rrz9i6THvhAizSjweYXA26lP5pCdxXuNaWwjODUilUnGScTpCIEoJA8DeHMjojx49VZTCmAaxnicnUNKFbm5TR+kugDtrIuM0/pLv2q5HyPE6XzvD1NPA5f0V/wDhq7qsrEiTHmgLYeShwYJU2QOsVA8YzfpLv2qyi5zErSoyXCAcnJrSqdNc1JNlLI3Tg4vA6DhRWqDvNpPWKK9Hk4WDxnq3IT6upB91JA4dVPUoJMdwKSFJ3TlJ51S/kQ08Abrn67TO6SecD2jvVSfDIv8AprCkhSSlWqTyNMP5F9AbrCjCGCYDWPPSPu+XeQ5z1d1lB5yKDnkR20wfkX0BqjEL6A1Ue75d5Bz2Pdfoc32utsq63O3RYLe+6W3VakAAAp1JNas/BxMUnL9wjIV1NtqUB6Tima+y0QdprW/Hh4aEV8SOj1UhG835WOeDjPYTV8FhSUqQoFJ1BGoIxyp6qHs4KPYJ2T3ycjlF72GusVxhENsT0qySUo3UjHJWTzpzQm7rSA3aSgnm/JQn3ZqyvG0FusriE3N3oukG83hJVvY48BpVanbzZ3IHhivKOmWla+ypsqjZjcia7ZQ+kxIs97nRnWXZUSEFIIHQFbis9qiBjtwM9VWez7ryISIMyMmPKipDZQ2Pk1pHBaP2T7DWkfaazSRus3BrpFfNbcPRlR6hvY1qTCusWa4lDPSbxb6RJUnAIzhSf9SToRy81TCEYLCREpyl9RUbV7VRdn0uNtYcnrSCGgnhpopXq4cT5qS9hrbJmXJd6lpJQN7cWsfPWeKh2cde3srpdygW64R1+Mo7DjSM5WsDyccTvcqp35aNkktGaz4fZl4QhzG89HPIE/noxz46c6iyMpx2xeMhXJRluZKAPM8zWfSKu4z9tlRmpLERlbLiAtC0nIINen5F/wBPapHmEu8hznq7rF/00ZpgPgf5tvaPDicUYhfQGvXUe75d5Bz2PdZbW5e/AjqPNtPuor0ihIjNhCAhO6MJHKiu/DhFI48mss3dTvNqT1g0upGAMnJAxk0yHhVQ7GYS8oKkhOvzd3hWdsc4LVvBDIyMZI1ByKNTxqV4PH+lJ+zR0EflKT9nhWG1mu5EXs9VGaldBHP6UkHsTQGI+P8Aa0/Zo2snchUu1wj27aS1PXB1LKVxH294nyQoqaOp5DTiauhJihkOodZKN3QpWnBHYeH4UofCVb3J94s0OAoPvOtvYGMAYKDknzZqsa+D2W7DQ6mY0h4pBUy42U7p6iQTw81GO0lPJA+E67QrhMi+BvJfTHQQ4pOqTk5wDz9FdTRHjhKdxpKUgZSkJGlcQ2hssu1PIjXFoNlZ8lSTlKhwyD1V3zoI+6AmYkch5GaMZ6CM4Ib0dh9stvstuoOhS4gKHtpbkiPshKbktBSLTLd3HmBqGHCCQtI6iAQR2DHVTkWY27veFpA46ppOvki1X+8QrIiT08ZKlvOOIyEOLSkgNpUOJ8ok46qHENyZsra6zQ4qg5cFzlbxwENneKSfmnQDQaZ0rnN1ujs8hkLcRBaWox4ylZDSTy7uoaCunfE+wbuDbk4/WLis++lDbPZJq0RvGEBxfgwUEuNuKyUZ4EHqz19lQiS2+CmY89ZJEVzBbivlKCTqAob2PWVU7EBQweFJfwOsBVknuOrDSVy/IJHzvIGf689P3QR/pafs1O1ldyIoJyQRjHProqV4PH+lp+zW7cZhTiUpkhRzwCaNjByRZsp3WUJ6kgUVuKzTnQLBVXdmiFIdA0OiqtK8n2kvNKbVwI9VROO5YJi8MXzuqyhWM4zg0HWvfwN8E4aPXpQqK+EnLahp87qpPbLsGdyPGkeQdp7hJusu3z1x4Md1aGWg2klzd0ISMdh486fjFkZPyKxg6dtJbsq9bPWyEh2wTluh47xjjpg5vEqVkIyRx0J5gVKjLsDKLHZqCkAXJ+5quUmQ2Ah9WBut8cJTy461cIYaQ8t9CAHHQAtQ/OxwJ6653br4/DuDjidn7wpoOlxhpuI4FMqV/aIxu/MUdcdetOliu5u4fD0CVDXHUkKblJ3V6jIOOVQ0yckTabZmBtE+wJ0h9taEKCUNFOFDIzxB/o1GZt18TdFxJF5n+B7oUw82lsZAOFIV5PzscCP5UbbbQMWkMMlDpmH5WOtKQUhQOMEccEEg9hqxtN+RcZDkZ+LKgSE7vyUpG4peQT5IOp+aqjjgMmxsEFeVTnJMwDiJchS0Adqc7uPRXu9DgS0JaS2jMR5KkdH5KmVjBGMcND5iKrtqtp42zgj+ExlvF0KUndIAGOv10tquu0lwvDFws+zc5hxbfRK6RCujeTxSVbwSNM8c0KLYZwP0xUhEV1UMIU8lJKUOHAURyJHDPXXM9s9qTtAxFtdqYeKnSC62U+UV8kjHEDr7qtZuz2319cUxPW1Ei5wpKHBjHmTx8xNMGzGwrOz5XIShyVMXp060gbo5hI5VbayMokbL2vxLYocFRHSISS4QeK1HJ9+PRVrXqqLJKhho41z5PPl+NZ8EkH+6VVdsuwMo8qn2lrKlOngNBUVMKQDo0Rk61cx2kstJbTyHrrWuD3cTOySxhHpRWaKZMQooooAVNuLTOfjeMLVIfbksow420sjpUDJ5cxk+uuaC8XQAYuUwdWHld9d1Nc/222OK1uXK0N5UcqejpHHrUnt6xQY2Qb4oSheLoNBcZYHLD6u+gXi6Z/3nN/jq76hZ5HQ1igXyycbzdSP96S8Hhl5Wvtq/2MnrCrnJmvLdBeYQtxxW8UgpIBPZnA7KUtMcKlQLpJtkWdHZjx5LMxIC0O5yQAQeB7azsTawjfTz2yzJkr4WFKauttWklK0IyCDwIVWlouRkXtyNPkuFctKA1JWreWy6gkoIJ5ZUR6fPVJe5Nzu6IPhbSVrjNhG+FjKxnie2tpTJcQsoQne8lSVZwoYzoD259grJRe0Zdsd6eS8+FnpVItaZCUh0trCwnUE6Zx2d9R27tdAhs+MJYwkDAfVp7ardorhdL+xEEmOhK46d3fChlfDJOvHSvVAISN4gnAzrzq9Sa6THVTTxhk/xxdM58Yy8/v1d9Hji6H/Epn8dXfULIorYVyyb44umMeMZmf36u+jxzdB/iMvH75XfUH3V0DYrY477dzu6MburMZXsUoe4UFopyeC42FtlxZjGddpUlx14fJsuuKIbT14PM02VjFZoG0sLAUUUUEhRRRQAUUUUAVU+zRHUOuswICpKtd55kEKPaRr6aRLrdX7TI6KfsrbWyfmq3MpX5jzrqFeT8dmS0pqQ2h1tWikrGQaCko56Dk/xsY+rtq+x/Kj42MfVy1fYprunwfW2TlcB1yGs/mjy0H0E+40sTdgb1HJMdLMpP7Cwk+pWPfQYyViNPjYx9XbV9isfGtjez8XbVwP5lVr2zt6Y/tLZJ/8AFG97RUfxVcs48XTM/uFd1BTMy6+NcfH/AA7av4dA2sY+rlq+xVazs7eX/wCztkrX9Zvd99W0LYG9SCDISzFSeO+veI9Cc++glObPI7Wxxj/87auOPmfyqba7u9dn+ht+ytteUPnHcwlPnPAVfWv4PbbHCVXB52YvqGW0eoHPtpujRmIrKWYzSGm08EoGAKDWMJdZXW+zRGm23H7fATJGuWWgAk9hOvpq1FGKzQapYCiiigkKKKKACiiigAooooAKKKKACsUUUAZrFFFABRRRQAVmiigAooooAKKKKACiiigD/9k="></AvatarImage>
                </Avatar>
                <span>Bitcoin</span>
              </TableCell>
              <TableCell>BTC</TableCell>
              <TableCell>9124463121</TableCell>
              <TableCell>9124456121</TableCell>
              <TableCell>-0.71244</TableCell>
              <TableCell className="text-right">$250.00</TableCell>

              <Button
                variant="ghost"
                className="h-10 w-10  "
                size="icon"
                onClick={() => handlerToRemove(item.id)}
              >
                {" "}
                <BookmarkFilledIcon className="w-6 h-6" />
              </Button>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
